const mongoose = require('mongoose');
const Router = require('express').Router;
const UserRouter = Router();

const CONNECTION_STRING = 'mongodb+srv://todoAdmin:1111@cluster0.oxik2.mongodb.net/userslist?retryWrites=true&w=majority'
const UserSchema = new mongoose.Schema({
// id: Number,
  password: String,
  login: String,
  age: Number  
});
const UserModel = mongoose.model('user', UserSchema);
mongoose.connect(CONNECTION_STRING);

UserRouter.get('/', async (req, res) => {
    const data = await UserModel.find({});
    res.send(data);
});

UserRouter.post('/', async (req, res) => {
    if(req.body.login && req.body.password){
        const user = new UserModel(req.body);
        const result = await user.save();
        res.send(result);
    }else{
        return res.status(403).send("Error");
    }
})

UserRouter.get('/:id', async (req, res) => {
    const result = await UserModel.findById(req.params.id);
    res.send(result);
});

UserRouter.delete('/:id', async (req, res) => {
    const result = await UserModel.findByIdAndDelete(req.params.id);
    res.send(result);
});

UserRouter.put('/:id', async (req, res) => {
    const data = req.body;
    const result = await UserModel.findByIdAndUpdate(req.params.id, data);
    res.send(result);
})

module.exports = UserRouter;