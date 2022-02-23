function getQueryParamValues (params) {

    lineObject = (param, params, index) => {
        return index !== undefined
          ? {
              lineId: param,
              dateBegin: params[param].date[index]
            }
          : {
              lineId: param,
              date: params[param].date
            };
      };

    const lines = [];
    Object.keys(params).forEach((param) => {
      if (Array.isArray(params[param].date)) {
        for (let i = 0; i < params[param].date.length; i++) {
          lines.push(lineObject(param, params, i));
        }
      } else {
        lines.push(lineObject(param, params));
      }
    });
    return lines;
  };

  module.exports = { getQueryParamValues }
