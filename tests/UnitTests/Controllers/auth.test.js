const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../../../config/auth');
const Models = require('../../../models');
const User = Models.user;
const Role = Models.role;
const authController = require('../../../controllers/auth');
const {mockRequest, mockResponse} = require('../interceptor');
const newUser = require('../mockData/newUser.json');
const newUserWithoutRole = require('../mockData/newUserWithoutRole.json');
const userData = require('../mockData/userData.json');
/**
 * Tests for sign up method
 * 
 * 1.1 Successful sign up when user provides the role
 * 1.2 successful sign up when user doesn't provide any role
 * 2 Failed sign up when user is providing wrong role (i.e. role which doesn't exists)
 */
let req, res;
beforeEach(() =>{
    req = mockRequest();
    res = mockResponse();
});

describe("Tests for sign up method of auth controller", ()=>{

    it("Successful sign up when user provides the role", async()=>{
        req.body = newUser;
        const resFromCreate = {
            setRoles:async() => Promise.resolve()
        }

        const spyOnCreate = jest.spyOn(User, 'create').mockImplementation(() => Promise.resolve(resFromCreate));
        const spyOnFindAll = jest.spyOn(Role, 'findAll').mockImplementation(() => Promise.resolve());

        await authController.signUp(req, res); //we need to wait for signUp function to complete
        
        //Validating if the test is passing successfully or not

        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(User.create).toHaveBeenCalled();
        await expect(Role.findAll).toHaveBeenCalled();
        console.log(res.status);
        expect(res.status).toHaveBeenCalled();
        
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({message: "user registered successfully!"});

    });

    it("successful sign up when user doesn't provide any role", async()=>{
        req.body = newUserWithoutRole;
        const resFromCreate = {
            setRoles:async() => Promise.resolve()
        }

        const spyOnCreate = jest.spyOn(User, 'create').mockImplementation(() => Promise.resolve(resFromCreate));
        const spyOnFindAll = jest.spyOn(Role, 'findAll').mockImplementation(() => Promise.resolve());

        await authController.signUp(req, res); //we need to wait for signUp function to complete
        
        //Validating if the test is passing successfully or not

        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(User.create).toHaveBeenCalled();
        await expect(Role.findAll).toHaveBeenCalled();
        console.log(res.status);
        expect(res.status).toHaveBeenCalled();
        
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({message: "user registered successfully!"});

    });

    it("failed sign up should return error message", async()=>{
        req.body = newUserWithoutRole;
        const spyOnCreate = jest.spyOn(User, 'create').mockImplementation(() => Promise.reject(Error("This is an error")));
        await authController.signUp(req, res); //we need to wait for signUp function to complete
        
        //Validating if the test is passing successfully or not
        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(User.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({message: "This is an error"});
    });
});


describe("Tests for sign in method of auth controller", ()=>{
    
    beforeEach(() =>{
        req.body = userData;
    });

    const userHashedPassword = bcrypt.hashSync(userData.password, 10);
    const roles = [
        {
            id : 1,
            name: 'customer'
        }
    ];
    const resFromFindOne = {
        ...userData,
        // username : "testUser",
        // email : "test@gmail.com",
        id: 1,
        password: userHashedPassword,
        getRoles: async() => Promise.resolve(roles),
    };
    var token = jwt.sign({id: 1}, config.secretKey, {
        expiresIn: 86400 //24 hours
    });

    const expectedResFromSignIn = {
        id: 1,
        username: userData.username,
        email: userData.email,
        roles: ["ROLE_CUSTOMER"],
        accessToken: token
    };

    it('it should return user info with access token', async()=>{
        const spyOnFindOne = jest.spyOn(User, 'findOne').mockImplementation(() => Promise.resolve(resFromFindOne));

        await authController.signIn(req, res);
        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(User.findOne).toHaveBeenCalled();
        await expect(User.findOne).toHaveBeenCalledTimes(1);
        await expect(res.status).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalledWith(200);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith(expectedResFromSignIn);
    });

    it('it should return user not found, for null user', async()=>{
        const spyOnFindOne = jest.spyOn(User, 'findOne').mockImplementation(() => Promise.resolve(null));
        await authController.signIn(req, res);

        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(User.findOne).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({message:"User NOT found"});
    });

    it('it should return invalid password, for wrong password', async()=>{
        const spyOnFindOne = jest.spyOn(User, 'findOne').mockImplementation(() => Promise.resolve(resFromFindOne));
        req.body.password = "wrong-test-password"; //incorrect password
        await authController.signIn(req, res);

        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(User.findOne).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({message:"Invalid Password"});
    });

    it('it should return error message in catch', async()=>{
        const spyOnFindOne = jest.spyOn(User, 'findOne').mockImplementation(() => Promise.reject(Error("This is an error")));
        await authController.signIn(req, res);

        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(User.findOne).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({message:"This is an error"});
    });

});