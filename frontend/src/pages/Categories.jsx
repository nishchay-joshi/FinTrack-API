import { useEffect, useState } from "react";
import api from "../services/api";
import CategoryGrid from "../components/categories/CategoryGrid.jsx";
import CategoryModal from "../components/modals/CategoryModal";
import "../styles/categories.css";

function Categories() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    async function fetchCategories() {
        try {
            const response = await api.get("/api/category/");
            setCategories(response.data);
        } catch (error) {
            console.error(error);
            setError("Failed to load categories.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    async function handleDelete(categoryId) {

        const confirmed = window.confirm("Are you sure you want to delete this category?");

        if (!confirmed) return;

        try {
            await api.delete(`/api/category/${categoryId}`);
            await fetchCategories();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="categories-page">
            <div className="categories-header">
                <div>
                    <h1>Categories</h1>
                    <p>
                        Organize your transactions better.
                    </p>
                </div>
                <button
                    className="add-category-button"
                    onClick={() => {
                        setSelectedCategory(null);
                        setIsModalOpen(true);
                    }}
                >
                    + Add Category
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <CategoryGrid
                    categories={categories}
                    onEdit={(category) => {
                        setSelectedCategory(category);
                        setIsModalOpen(true);
                    }}
                    onDelete={handleDelete}
                />
            )}
            <CategoryModal
                isOpen={isModalOpen}
                category={selectedCategory}
                onClose={() => {
                    setSelectedCategory(null);
                    setIsModalOpen(false);
                }}
                onSuccess={fetchCategories}
            />
        </div>
    );
}

export default Categories;