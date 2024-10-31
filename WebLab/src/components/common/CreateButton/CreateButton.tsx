import React, {FC} from 'react';
import './CreateButton.css';

interface CreateButtonProps {
    name: string;
    onCreateModal: () => void;
}

const CreateButton: FC<CreateButtonProps> = ({ name, onCreateModal }) => {
    const handleClick = () => {
        onCreateModal();
    };

    return (
        <div className="create">
            <button onClick={handleClick}>{name}</button>
        </div>
    );
};

export default CreateButton;