// AsyncHandler using promise

const asynchandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}



export {asynchandler}

// AsyncHandler using try & catch block

/*

const asynchandler = (requestHandler) => async (req, res, next) => {
    try {
        await requestHandler(req, res, next)
    } catch (error) {
        res.status(err.code || 500).json({
            success : false,
            message : err.message
        })
    }
}

*/