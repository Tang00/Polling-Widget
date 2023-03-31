import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import createStore from './database.js'

const db = createStore()
const sequelize = db.db

const typeDefs = `#graphql
    type Query {
        polls: [Poll!]
        poll(id: Int!): Poll
    }

    type Mutation {
        vote(id: Int, pollId: Int): VoteResponse
    }
    
    type Poll {
        id: Int!
        prompt: String!
        responses: [Response!]!
        totalVotes: Int
    }

    type Response {
        id: Int!
        response: String!
        votes: Int
    }

    type VoteResponse {
        success: Boolean!
        result: Poll
    }
`

const resolvers = {
    Query: {
        polls: async () => 
            db.Poll.findAll()
        ,

        poll: async (_, args) =>
            db.Poll.findByPk(args.id)
            
    },
    Poll: {
        //Returns responses sorted by position value
        responses: async (parent) => 
            db.Response.findAll({ where: {poll_id: parent.id}, order: [['pos', 'ASC']]})
        ,
        totalVotes: async (parent) => {
            const result = await db.Response.findOne({ 
                attributes: [
                    [sequelize.cast(sequelize.fn('SUM', sequelize.col('votes')), 'signed'), 'total_votes']],
                where: {poll_id: parent.id}})
            return result?.dataValues?.total_votes
        }
        ,
    },
    Mutation: {
        vote: async (_, {id, pollId}) => {
            const vote = await db.Response.increment("votes", {where: {id: id}})
            const result = await db.Poll.findByPk(pollId)
            if (vote?.[0]?.[1] > 0) {

                return {success: true, result: result}
            }
            else {
                return {success: false, result: null}
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, {
    listen: {port: 4000},
})

console.log(`Server ready at: ${url}`)