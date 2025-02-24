const tokenCheck = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
         message: 'Token não encontrado',
       });
       }
       if (token.length !== 16) {
         return res.status(401).json({
          message: 'Token inválido',
        }); 
        }
        next();
       };
  
    const nameCheck = (req, res, next) => {
    const { name } = req.body;
    
    if (!name || name === '') {
    return res.status(400).json({
    message: 'O campo "name" é obrigatório',
    });
    }
    
    if (name.length < 3) {
    return res.status(400).json({
    message: 'O "name" deve ter pelo menos 3 caracteres',
    });
    }
    
    next();
    };
    
    const ageCheck = (req, res, next) => {
    const { age } = req.body;
    const isvalidAge = Number.isInteger(age);
    if (!age) {
    return res.status(400).json({
    message: 'O campo "age" é obrigatório',
    });
    }
    
    if (!isvalidAge || age < 18) {
    return res.status(400).json({
    message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
    }
    
    next();
    };
    
    const talkCheck = (req, res, next) => {
    const { talk } = req.body;
    
    if (!talk) {
    return res.status(400).json({
    message: 'O campo "talk" é obrigatório',
    });
    }
    
    next();
    };
    
    const dateCheck = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const dateRegex = /^([0-2][0-9]|(3)[0-1])\/((0)[0-9]|(1)[0-2])\/\d{4}$/i;
    const isValidDate = dateRegex.test(watchedAt);
    
    if (!watchedAt || watchedAt.length === 0) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    
    if (!isValidDate) {
    return res.status(400).json({
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
    }
    
    next();
    };
    
    const rateCheck = (req, res, next) => {
    const { talk: { rate } } = req.body;
    
    if (rate === undefined) {
    return res.status(400).json({
    message: 'O campo "rate" é obrigatório',
    });
    }
    
    if (rate <= 0 || rate > 5 || !Number.isInteger(rate)) {
    return res.status(400).json({
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
    }
    next();
    };
    
    module.exports = {
    tokenCheck,
    nameCheck,
    ageCheck,
    talkCheck,
    dateCheck,
    rateCheck,
    };