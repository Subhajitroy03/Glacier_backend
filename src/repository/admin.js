const prisma = require("../../prisma/client");
const baseRepository= require('./baseRepository');
class adminRepository extends baseRepository {
    constructor(){
        super(prisma.admin);
    }
}
module.exports = adminRepository;