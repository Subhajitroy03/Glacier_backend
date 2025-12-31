const prisma = require("../../prisma/client");
const baseRepository = require('./baseRepository');
class officialRepository extends baseRepository {
    constructor() {
        super(prisma.official);
    }
}
module.exports = {officialRepository};