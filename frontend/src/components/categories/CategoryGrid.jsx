import CategoryCard from "./CategoryCard";

function CategoryGrid({
    categories,
    onEdit,
    onDelete,
}) {

    if (categories.length === 0) {
        return (
            <div className="empty-state">
                <h2>No categories yet</h2>
                <p>Create your first category to get started.</p>
            </div>
        );
    }

    return (
        <div className="category-grid">
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    category={category}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default CategoryGrid;