export const formatPrice = (dollars) => {
    return parseInt(dollars).toLocaleString('zh-TW', {
        style:'currency',
        currency: 'TWD'
    });
};

