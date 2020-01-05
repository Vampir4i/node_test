const graphql = require('graphql');
const Worker = require('../models/worker');
const User = require('../models/user');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const WorkerType = new GraphQLObjectType({
    name: 'Worker',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        gender: { type: GraphQLString },
        info: { type: GraphQLString },
        data: { type: GraphQLString },
        salary: { type: GraphQLInt },
        position: { type: GraphQLString }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        login: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

const RequestWorkerType = new GraphQLObjectType({
    name: 'newWorker',
    fields: () => ({
        worker: {type: GraphQLList(WorkerType)},
        totalPage: { type: GraphQLInt }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addWorker: {
            type: WorkerType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                age: { type: GraphQLInt },
                gender: { type: GraphQLString },
                info: { type: GraphQLString },
                data: { type: GraphQLString },
                salary: { type: GraphQLInt },
                position: { type: GraphQLString }
            },
            resolve(parent, {firstName, lastName, age, gender, info, data, salary, position}){
                const worker =  {firstName, lastName, age, gender, info, data, salary, position};
                const worker = new Worker(worker);

                return worker.save();
            }
        },
        deleteWorker: {
            type: WorkerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, {id}){
                return Worker.findByIdAndDelete(id);
            }
        },
        updateWorker: {
            type: WorkerType,
            args: {
                id: { type: GraphQLID },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                age: { type: GraphQLInt },
                gender: { type: GraphQLString },
                info: { type: GraphQLString },
                data: { type: GraphQLString },
                salary: { type: GraphQLInt },
                position: { type: GraphQLString }
            },
            resolve(parent, {id, firstName, lastName, age, gender, info, data, salary, position}){
                const worker =  {firstName, lastName, age, gender, info, data, salary, position};
                return Worker.findOneAndUpdate({_id: id}, worker, {new: true});
            }
        },
        addUser: {
            type: UserType,
            args: {
                login: { type: GraphQLString },
                password: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve(parent, {login, password, email}){
                const user = new User({login, password, email});

                return user.save();
            }
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        workers: {
            type: RequestWorkerType,
            args: { 
                page: { type: GraphQLInt },
                count: { type: GraphQLInt }
            },
            async resolve(parent, {page, count}){
                let data = {};
                await Worker.paginate({}, { page: page, limit: count }, (error, result) => {
                    data.worker = result.docs; 
                    data.totalPage = result.total;
                });
                return data;
            }
        },
        user: {
            type: UserType,
            args: {
                login: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, {login, password}){
                return User.findOne({login: login, password: password});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
