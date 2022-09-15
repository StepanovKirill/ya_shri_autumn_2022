const TEXT_STYLES_MAPPER = {
    fontSize: (value) => `font-size: ${value}px;`,
    fontWeight: (value) => `font-weight: ${value};`,
    textAlignHorizontal: (value) => `text-align: ${value.toLowerCase()};`,
    lineHeightPx: (value) => `line-height: ${value}px;`,
}

const POSITION_AND_SIZE_MAPPER = (value) => `box-sizing: border-box; display: flex; width: ${value.width}px; height: ${value.height}px;`

const COLOR_MAPPER = value => {
    if ('color' in value[0]) {
        return `background-color: rgba(${+value[0].color.r * 255}, ${+value[0].color.g * 255}, ${+value[0].color.b * 255}, ${+value[0].color.a});`
    }
    return "";
}
    
const TEXT_COLOR_MAPPER = value => {
    if ('color' in value[0]) {
        return `color: rgba(${+value[0].color.r * 255}, ${+value[0].color.g * 255}, ${+value[0].color.b * 255}, ${+value[0].color.a});`
    }
    return "";
}

const buildBlock = ({ type, content, className, style, id, name = '' }) => {
    return `<${type} name="${name}" class="${className}" ${style ? `style="${style}` : ""}" id=${id}>${content}</${type}>`;
};

const getStyles = (node) => {
    const styleArr = [];
    if (node.fills) {
        node.type == 'TEXT' 
        ? styleArr.push(TEXT_COLOR_MAPPER(node.fills))
        : styleArr.push(COLOR_MAPPER(node.fills))

        !!node.type == 'IMAGE' && styleArr.push(`background-image: url("${node.fills.imageRef}");`)
    }
    if (node.style) {
        for (let [key, value] of Object.entries(node.style)) {
            if (TEXT_STYLES_MAPPER[key]) {
                styleArr.push(TEXT_STYLES_MAPPER[key](value));
            }
        }
    }
    
    if (node.type !== 'TEXT') {

        styleArr.push(POSITION_AND_SIZE_MAPPER(node.absoluteBoundingBox))
        
        if (node.paddingLeft) {
            styleArr.push(`padding-left: ${node.paddingLeft}px;`)
        }
        if (node.paddingRight) {
            styleArr.push(`padding-right: ${node.paddingRight}px;`)
        }
        if (node.paddingTop) {
            styleArr.push(`padding-top: ${node.paddingTop}px;`)
        }
        if (node.paddingBottom) {
            styleArr.push(`padding-bottom: ${node.paddingBottom}px;`)
        }
        if (node.layoutMode) {
            node.layoutMode == 'VERTICAL'
            ? styleArr.push(`flex-direction: column;`)
            : styleArr.push(`flex-direction: row;`)
        }
        if (node.itemSpacing) {
            styleArr.push(`gap: ${node.itemSpacing}px;`)
        }

        if (node.cornerRadius) {
            styleArr.push(`border-radius: ${node.cornerRadius}px;`)
        }
    }

    return styleArr.join(' ');
}



const PRIMITIVES = {
    TEXT: (node) => {
        return buildBlock({
            type: 'span',
            content: node.characters,
            className: node.type,
            style: getStyles(node),
            id: node.id,
        });
    },
    INSTANCE: (node) => {
        return buildBlock({
            type: 'div',
            content: node.children 
                ? node.children.map(item => item.type in PRIMITIVES ? PRIMITIVES[item.type](item) : '').join('') : '',
            className: node.type,
            style: getStyles(node),
            id: node.id,
            name: node.name
        })
    },
    FRAME: (node) => {
        return buildBlock({
            type: 'div',
            content: node.children 
                ? node.children.map(item => item.type in PRIMITIVES ? PRIMITIVES[item.type](item) : '').join('') : '',
            className: node.type,
            style: getStyles(node),
            id: node.id,
            name: node.name
        })
    },
    RECTANGLE: (node) => {
        return buildBlock({
            type: 'div',
            content: node.children 
                ? node.children.map(item => item.type in PRIMITIVES ? PRIMITIVES[item.type](item) : '').join('') : '',
            className: node.type,
            style: getStyles(node),
            id: node.id,
            name: node.name
        })
    },
    COMPONENT: (node) => {
        return buildBlock({
            type: 'div',
            content: node.children 
                ? node.children.map(item => item.type in PRIMITIVES ? PRIMITIVES[item.type](item) : '').join('') : '',
            className: node.type,
            style: getStyles(node),
            id: node.id,
            name: node.name
        })
    },
    CANVAS: (node) => {
        return buildBlock({
            type: 'div',
            content: node.children
                ? node.children.map(item => item.type in PRIMITIVES ? PRIMITIVES[item.type](item) : '').join('') : '',
            className: node.type,
            id: node.id,
            name: node.name
        })
    },
    DOCUMENT: (node) => {
        return (node.children 
        ? node.children.map(item => item.type in PRIMITIVES ? PRIMITIVES[item.type](item) : '').join('')
        : '');
    },
};

const parse = (node) => {
    return PRIMITIVES[node.type](node);
};

module.exports = function (json) {
    if (json.document) {
        return parse(json.document);
    }
    return ""
};