//helper function for formatting the cost
export const formatNum = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCost = (state) => {
    //calculate the items cost
    state.itemsCost = formatNum(
        state.cartItems.reduce(
            (totalCost, item) => totalCost + item.price * item.qty,
            0
        )
    );

    //calculate the shipping cost (free if order > 1000 then free or shipping will be 99/-)
    state.shippingCost = formatNum(
        state.itemsCost > 1000 || state.itemsCost == 0 ? 0 : 99
    );

    //calculate the tax price (18%)
    state.taxCost = formatNum(Number(state.itemsCost * 0.18));

    //calculate the total price
    state.totalCost = formatNum(
        +state.itemsCost + +state.shippingCost + +state.taxCost
    );

    localStorage.setItem("cart", JSON.stringify(state));
};
