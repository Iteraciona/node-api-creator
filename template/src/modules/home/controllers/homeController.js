export const index = async (req, res, next) => {
    res.status(200).json({
        message: "Hello there! Welcome to a your new API",
        success: true
    })
}

export const errorPage = async (req, res, next) => {
    res.status(404).json({
        message: "Something went wrong.",
        success: false
    });
}