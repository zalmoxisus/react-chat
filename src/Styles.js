var styles = {
    base: {
        background: '#dcdcdc',
        color: '#424242',
        width: '100%',
        border: '1px solid #424242',
        overflowY: 'scroll',
        overflowX: 'hidden',
        wordWrap: 'wordBreakWrap'
    },
    arrow: {
        content: '',
        borderStyle: 'solid',
        width: '0',
        zIndex: '1',
        position: 'absolute',
        marginTop: '12px'
    },
    arrowLeft: {
        borderWidth: '5px 6px 5px 0',
        borderColor: 'transparent #f6f9fd',
        left: '29px',
        float: 'left'
    },

    arrowRight: {
        borderWidth: '5px 0 5px 6px',
        borderColor: 'transparent #e6ffd1',
        right: '5px',
        float: 'right'
    },
    msgBox: {
        width: '98%',
        position: 'relative',
        margin: '10px',
        lineHeight: '1.4',
        float: 'left'
    },

    msg: {
        borderRadius: '3px',
        padding: '5px 5px 2px 5px',
        marginRight: '10px',
        maxWidth: '90%'
    },

    my_msg: {
        background: '#e6ffd1',
        border: 'solid 1px #b4d89f',
        float: 'right'
    },

    u_msg: {
        background: 'rgba(249, 252, 255, 1)',
        border: 'solid 1px #a6b8c9',
        float: 'left'
    },
};

export default styles;