import Models from "../db/models"
import {decode} from "../helper/jwtTokenize"
import {v4 as uuidv4 } from 'uuid';
const {educationCollections,organisations} = Models;

class educationCollectionController{
    static async addEducationCollection(req,res){
        const token = req.headers["token"];
        const Token=decode(token)
        console.log(token,Token)
        const orgId= Token.dborganisationId
        try {
            const {studentName,age,gender,subject,level} = req.body;
            const FindOrganisation= await organisations.findOne({
                where:{id:orgId}
            })
            if(FindOrganisation){
                const createCollection = await educationCollections.create({
                    id:uuidv4(),
                    studentName,
                    age,
                    gender,
                    subject,
                    level,
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
    static async getEducationCollection(req,res){
        const collection =await educationCollections.findAll();
        return res.status(200).json({
           responseCode:200,
           status: 'Success',
           data: collection,
         });
       } catch (error) {
        return res.status(500).json({
           responseCode:500,
           status: 'Failed',
           message: error.message 
           });
       }
    }

export default educationCollectionController