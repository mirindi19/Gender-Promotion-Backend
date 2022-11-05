import Models from "../db/models"
import {decode} from "../helper/jwtTokenize"
import {v4 as uuidv4 } from 'uuid';
const {collections,organisations} = Models;

class collectionController{
    static async addCollectionController(req,res){
        const token = req.headers["token"];
        const Token=decode(token)
        console.log(token,Token)
        const orgId= Token.dborganisationId
        try {
            const {Fullname,position,age,salary,gender} = req.body;
            const FindOrganisation= await organisations.findOne({
                where:{id:orgId}
            })
            if(FindOrganisation){
                const createCollection = await collections.create({
                    id:uuidv4(),
                    Fullname,
                    position,
                    age,
                    salary,
                    gender,
                    organisationId:orgId


                })
                return res.status(200).json({
                    status:200,
                    message:"collection success",
                    data:createCollection
                })
            }
            else{
                return res.status(400).json({
                    status:400,
                    message:"organization not found",
                })
            }

        } catch (error) {
            res.status(500).json({
                status:500,
                message:"server problem:" + error.message
            })
        }
    }

    static async getCollectionEmp(req,res){
        const Provinces =await collections.findAll();
        return res.status(200).json({
           responseCode:200,
           status: 'Success',
           data: Provinces,
         });
       } catch (error) {
        return res.status(500).json({
           responseCode:500,
           status: 'Failed',
           message: error.message 
           });
       }
    }

export default collectionController