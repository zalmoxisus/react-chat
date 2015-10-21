var styles = {
    base: {
        background: '#dcdcdc',
        color: '#424242',
        width: '100%',
        minWidth: '160px',
        height: '100%',
        border: '1px solid #424242',
        overflowY: 'scroll',
        overflowX: 'hidden',
        position: 'absolute'
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
        left: '27px',
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
        maxWidth: '90%',
        '@media (max-width: 610px)': {
            maxWidth: '85%'
        },
        '@media (max-width: 420px)': {
            maxWidth: '80%'
        },
        '@media (max-width: 320px)': {
            maxWidth: '70%' 
        },
        '@media (max-width: 250px)': {
            maxWidth: '55%'
        }
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
    content_msg: {
        fontWeight: '600',
        fontSize: '16px',
        '@media (max-width: 400px)': {
            fontSize: '14px'
        },
        '@media (max-width: 250px)': {
            fontSize: '12px'
        }
    },
    footer_msg: {
        fontWeight: '100',
        fontSize: '10px',
        color: '#a4a4a4'
    },
    timeIcon: {
        float: 'left',
        margin: '2px 2px 0 3px',
        opacity: 0.7
    },

    avatar: {
        fontSize: '14px',
        float: 'left',
        width: '25px',
        height: '25px',
        marginRight: '7px',
        textAlign: 'center'
    },
    img: {
        height: '25px',
        borderRadius: '4px'
    },
    txt: {
        lineHeight: '1.8',
        border: '1px solid #90a4ae',
        borderRadius: '4px',
        color: '#ddd',
        fontWeight: '600',
        background: '#90a4ae',
        width: '95%',
        height: '100%'
    }
};

export default styles;