import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/modal.css";

function CategoryModal({
    isOpen,
    onClose,
    onSuccess,
    category = null,
}) {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        if (category) {
            setName(category.name);
        } else {
            setName("");
        }
    }, [category, isOpen]);

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);

        const payload = {name};

        try {
            if (category) {
                await api.patch(`/api/category/${category.id}`,
                    payload);
            } else {
                await api.post(
                    "/api/category/",
                    payload,
                );
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
                className="modal"
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
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="e.g. Food"
                            required
                        />
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