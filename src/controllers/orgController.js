import Models from "../db/models"
import {v4 as uuidv4} from 'uuid'
import { decode } from "jsonwebtoken";
const {organisations,educationCollections,collections,users} = Models;


class orgController{
    static async getOrganization(req,res){
        try {
            const org =await organisations.findAll();
           return res.status(200).json({
              responseCode:200,
              status: 'Success',
              data: org,
            });
          } catch (error) {
           return res.status(500).json({
              responseCode:500,
              status: 'Failed',
              message: error.message 
              });
          }
          
    }
    static async findOrgCollectionByCUserId(req,res){
        try {
            const token=req.headers['token']
            const Token=await decode(token)
            const orgId=Token.dborganisationId
          const organizationData=await organisations.findOne({
            where:{id:orgId},
            include:[{model:collections}],
          })
          if(organizationData){
      return res.status(200).json({
        responseCode:200,
        status:"successs",
        data:organizationData
      })
          }
          return res.status(400).json({
            responseCode:400,
            status:"failed",
            message:"organization not found"
          })
            
        } catch (error) {
            return res.status(500).json({
                responseCode:500,
                status: 'Failed',
                message: error.message 
                });  
        }
    }

    static async findOrgEducationCollectionByCUserId(req,res){
        try {
            const token=req.headers['token']
            const Token=await decode(token)
            const orgId=Token.dborganisationId
          const organizationData=await organisations.findOne({
            where:{id:orgId},
            include:[{model:educationCollections}],
          })
          if(organizationData){
      return res.status(200).json({
        responseCode:200,
        status:"successs",
        data:organizationData
      })
          }
          return res.status(400).json({
            responseCode:400,
            status:"failed",
            message:"organization not found"
          })
            
        } catch (error) {
            return res.status(500).json({
                responseCode:500,
                status: 'Failed',
                message: error.message 
                });  
        }
    }










    
    //////////////////////////////////////////////////////////////////
    static async addOrganisation(req, res){
        try {
            const {provinceId,name,status,Fullname, email,password}= req.body
            
            const UserCheck = await users.findOne({
                where:{email:email}
            });
            const CheckOrganisation = await organisations.findOne({
                where:{name: name}
            })
            if(!CheckOrganisation){
                if(!UserCheck){
                const organizationId = uuidv4();
                const createOrganisation = await organisations.create({
                    id:organizationId,
                    provinceId,
                    name,
                    status
                })
                res.status(200).json({
                    status:200,
                    message:"Organisation created",
                    data:createOrganisation
                })
                const createDate = await users.create({
                    id:uuidv4(),
                    Fullname,
                    email,
                    role:"organisationuser",
                    password,
                    status:false,
                    organizationId
                });
                res.status(200).json({
                    status: 200,
                    message: "Account created",
                    data:createDate
                })

            }else{
                return res.status(400).json({
                    status:400,
                    message:"Email is exit"
                })
            }
            }
            else{
              return  res.status(400).json({
                    status:400,
                    message:"Email exit"
                })
            }

            console.log('mirinnfi ');
        } catch (error) {
          return  res.status(500).json({
                status:500,
                message:"server problem" + error.message
            })
        }
    }

   
}

export default orgController


