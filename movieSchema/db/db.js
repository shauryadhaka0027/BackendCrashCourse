import mongoose from "mongoose";

const connection =mongoose.connect("mongodb+srv://shauryadhaka3:dhaka3027@cluster0.bmjygmb.mongodb.net/MovieApi?retryWrites=true&w=majority&appName=Cluster0")

export default connection