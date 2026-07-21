import { Pencil, Trash2 } from "lucide-react";
import { getCategoryIcon } from "../../utils/categoryOptions";

function CategoryCard({
    category,
    onEdit,
    onDelete,
}) {

    const Icon = getCategoryIcon(category.icon);

    return (
        <div className="category-card">
            <div className="category-card-top">
                <div
                    className="category-icon"
                    style={{backgroundColor: category.color}}
                >
                    <Icon
                        size={24}
                        color="white"
                        strokeWidth={2.2}
                    />
                </div>
                <div className="category-actions">
                    <button
                        className="category-action-btn"
                        onClick={() => onEdit(category)}
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        className="category-action-btn delete"
                        onClick={() => onDelete(category.id)}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
            <div className="category-content">
                <h3>{category.name}</h3>
                <p>Organize your transactions</p>
            </div>
        </div>
    );
}

export default CategoryCard;