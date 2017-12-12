import * as mongoose from 'mongoose';

export type CategoriesModel = mongoose.Document & {
    name: String,
    img: String,
    isActive: Boolean
};

 const categoriesSchema = new mongoose.Schema({
    name: String,
    img: String,
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Categories = mongoose.model<CategoriesModel>('Categories', categoriesSchema);
export default Categories;