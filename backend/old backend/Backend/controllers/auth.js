exports.login = (req, res, next) => {
    console.log("the controller login")
    res.status(200).json({ success: true, message: "Show all bootCamps", hello: req.hello });
}