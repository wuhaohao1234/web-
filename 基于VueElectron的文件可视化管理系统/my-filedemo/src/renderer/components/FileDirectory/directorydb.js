import fs from 'fs'
import path from 'path'
class Directorydb {
    init(dbFile, changeDbFile){
        var dbJson = fs.readFileSync(path.join(__static, 'db.json'), 'utf8')
        changeDbFile(JSON.parse(dbJson).dbFile)
    }
}
export default Directorydb