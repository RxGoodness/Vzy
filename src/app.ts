import express, { NextFunction } from "express";
import logger from "morgan";
import cors from "cors";
import path from 'path';
import { Request, Response } from "express";
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';

const app = express();

app.use(express.static(path.join(__dirname, '../', 'public')));
// view engine setup
app.set('views', path.join(__dirname, '../', 'views'));
app.set('view engine', 'jade');


// const corsOptions = {
//   origin: async (origin: any, callback: any) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else if (isOfficialSubdomain(origin)) {
//       callback(null, true);
//     } else if (await customDomainExists(origin)) {
//       callback(null, true);
//     } else {
//       callback("Not allowed by CORS", false);
//     }
//   },
// };
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
// app.use(cors(corsOptions));
app.use(cors());
if (app.get("env") === "production") {
  app.set("trust proxy", 1);
}

app.disable("x-powered-by");

app.use(logger("dev"));
app.use("/webhooks/paystack", express.raw({ type: "application/json" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.redirect('/api/v1');
});

app.use('/api/v1', indexRouter);

app.use("*", (req: Request, res: Response) => {
  const path = req.originalUrl;
  const method = req.method;
  return res.status(404).json({
    error: true,
    path,
    method,
    message: `The method ${method} is not defined on path ${path}`,
  });
});

app.use(function onError(
  err: any,
  _req: Request,
  res: any,
  _next: NextFunction
) {
  res.statusCode = err === "Not allowed by CORS" ? 403 : 500;
  res.end(`<h1>${err.toString()}</h1>`);
});

export default app;