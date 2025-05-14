import { IconType } from 'react-icons';

interface Category {
    id: string;
    name: string;
    icon: IconType;
    hasComments?: boolean;
}


interface CustomSelectProps {
    options: Category[];
    value?: Category;
    onChange: (value: Category) => void;
    placeholder?: string;
    disabled?: boolean;
    width?: string;
}

