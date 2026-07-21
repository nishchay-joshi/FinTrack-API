import { useEffect, useState } from "react";
import api from "../../services/api";
import {
    CATEGORY_ICONS,
    CATEGORY_ICON_OPTIONS,
    CATEGORY_COLORS,
} from "../../utils/categoryOptions";
import "../../styles/modal.css";

function CategoryModal({
    isOpen,
    onClose,
    onSuccess,
    category = null,
}) {

    const [name, setName] = useState("");
    const [icon, setIcon] = useState("Tag");
    const [color, setColor] = useState("gray");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Category received: ", category)
        if (!isOpen) return;

        if (category) {
            setName(category.name);
            setIcon(category.icon);
            setColor(category.color);
        } else {
            setName("");
            setIcon("Tag");
            setColor("gray");
        }
    }, [category, isOpen]);

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);

        const payload = {name, icon, color};

        try {
            if (category) {
                await api.patch(`/api/category/${category.id}`, payload);
            } else {
                await api.post("/api/category/", payload);
            }
            await onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
        >
            <div
                className="modal category-modal"
                onClick={(event) => event.stopPropagation()}
            >
                <h2>
                    {category
                        ? "Edit Category"
                        : "New Category"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            Category Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            placeholder="Food"
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Choose Icon
                        </label>
                        <div className="icon-picker">
                            {CATEGORY_ICON_OPTIONS.map((iconName) => {
                                const Icon = CATEGORY_ICONS[iconName];
                                return (
                                    <button
                                        key={iconName}
                                        type="button"
                                        className={
                                            icon === iconName
                                                ? "icon-option active"
                                                : "icon-option"
                                        }
                                        onClick={() => setIcon(iconName)}
                                    >
                                        <Icon size={20} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>
                            Choose Color
                        </label>
                        <div className="color-picker">
                            {CATEGORY_COLORS.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    className={
                                        color === item
                                            ? "color-option active"
                                            : "color-option"
                                    }
                                    style={{backgroundColor: item}}
                                    onClick={() => setColor(item)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="modal-actions">
                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : category
                                    ? "Save Changes"
                                    : "Create Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CategoryModal;