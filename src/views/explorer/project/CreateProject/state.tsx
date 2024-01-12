import { atom, useSetAtom, useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import { TEditProjectData, createProject } from 'src/services/project/api';
import { useWalletData } from 'src/states/wallet';

export const projectInitData: TEditProjectData = {
    name: '',
    banner: '',
    publicKey: '',
    overViewDescription: '',
    problemStatement: '',
    solution: '',
    challengeAndRisk: '',
    customSections: {
        '0': {
            title: '',
            description: '',
        },
    },
    teamMember: {
        root: {
            profileName: 'You',
            role: 'Product Owner',
            socialLink: '',
        },
    },
    additionalDocument: {},
};

const createProjectData = atom<TEditProjectData>(projectInitData);

export const useCreateProjectFunctions = () => {
    const _setProjectData = useSetAtom(createProjectData);
    const projectData = useCreateProjectData();
    const walletData = useWalletData();
    const setProjectData = (data: Partial<TEditProjectData>) => {
        _setProjectData((prev) => ({
            ...prev,
            ...data,
        }));
    };

    const setCustomSection = (data: TEditProjectData['customSections']) => {
        _setProjectData((prev) => ({
            ...prev,
            customSections: {
                ...prev.customSections,
                ...data,
            },
        }));
    };
    const setTeamMember = (data: TEditProjectData['teamMember']) => {
        _setProjectData((prev) => ({
            ...prev,
            teamMember: {
                ...prev.teamMember,
                ...data,
            },
        }));
    };

    const handleCreateProject = async () => {
        try {
            const result = await createProject(walletData.userAddress, projectData);
            toast('Create Project Success', { type: 'success' });
        } catch (error) {
            toast('There was an error creating project', { type: 'error' });
        }
    };
    return {
        setProjectData,
        setCustomSection,
        setTeamMember,
        handleCreateProject,
    };
};

export const useCreateProjectData = () => useAtomValue(createProjectData);
