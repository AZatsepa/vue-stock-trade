const state = {
  funds: 10000,
  stocks: [],
};

const mutations = {
  BUY_STOCK(argState, { stockId, quantity, stockPrice }) {
    const record = argState.stocks.find(element => element.id === stockId);
    if (record) {
      record.quantity += quantity;
    } else {
      state.stocks.push({
        id: stockId,
        quantity,
      });
    }
    argState.funds -= stockPrice * quantity;
  },
  SELL_STOCK(argState, { stockId, quantity, stockPrice }) {
    const record = argState.stocks.find(element => element.id === stockId);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      argState.stocks.splice(argState.stocks.indexOf(record), 1);
    }
    argState.funds += stockPrice * quantity;
  },
  SET_PORTFOLIO(argState, portfolio) {
    argState.funds = portfolio.funds;
    argState.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
  },
};

const actions = {
  sellStock({ commit }, order) {
    commit('SELL_STOCK', order);
  },
};

const getters = {
  stockPortfolio(argState, argGetters) {
    return argState.stocks.map((stock) => {
      const record = argGetters.stocks.find(element => element.id === stock.id);
      return {
        id: stock.id,
        quantity: stock.quantity,
        name: record.name,
        price: record.price,
      };
    });
  },
  funds: argState => argState.funds,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
