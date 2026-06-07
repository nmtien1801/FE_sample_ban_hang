import React, { useEffect, useState } from 'react';
import ApiPost from '../../apis/ApiPost'
import UploadField from '../FormFields/UploadField';
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom';

// Component chính
const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [jobData, setJobData] = useState([])

    // ============================================= INIT ========================================
    // 2. Tải dữ liệu cũ nếu là chế độ chỉnh sửa
    useEffect(() => {
        if (id) {
            fetchDetail(id);
        }
    }, [id]);

    const fetchDetail = async (id) => {
        const res = await ApiPost.getPostByIdApi(id);

        if (res && res.DT) {
            const data = res.DT;
            setJobData(res.DT)
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Header Section */}
                <header className="rounded-xl mb-5">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                        {jobData.title}
                    </h1>
                </header>

                {/* Main Content */}
                <div
                    className="prose max-w-none text-justify"
                    dangerouslySetInnerHTML={{ __html: jobData.detail }}
                />
            </main>
        </div>
    );
};

export default JobDetail;