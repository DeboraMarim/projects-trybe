const selectQuery = (querys, param, value) => {
    if (param === 'rate') {
      return querys.filter((talker) => talker.talk.rate === Number(value));    
    } if (param === 'q') {
      return querys.filter((talker) => talker.name.includes(value));
    } 
      return querys.filter((talker) => talker.talk.watchedAt.includes(value));
  };
  
  module.exports = selectQuery;
