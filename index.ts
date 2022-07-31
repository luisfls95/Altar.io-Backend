import express, {Request, Response} from "express";
import { getValuesArray, getCode } from "./functions";
import cors from "cors";

const app: express.Application = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

app.post("/api/getGridAndCode", (req: Request,res:Response)=>{
    const rowNum = req.body.rowNum
    const colNum = req.body.colNum
    const inputLetter = req.body.inputLetter
    const dataToSend = getValuesArray(rowNum, colNum, inputLetter)
    const code = getCode(dataToSend)
    res.send({grid: dataToSend, code: code})
});


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})
