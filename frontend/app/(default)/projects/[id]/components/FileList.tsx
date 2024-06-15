import IFile from '@/types/IFile';
import React from 'react';

interface FileListProps {
    data: IFile[];
}

const FileList: React.FC<FileListProps> = ({ data }) => {
    return (
        <ul>
            {data && data.map((file, index) => (
                <li key={index}>
                    <a href={`http://localhost:5555/api/files/download/${file.filePath.split('\\').pop()}`} target="_blank" rel="noopener noreferrer">{file.fileName}</a>
                </li>
            ))}
        </ul>
    );
}

export default FileList;
