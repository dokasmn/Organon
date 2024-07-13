// HOOKS
import { useLoading } from '../contexts/LoadingContext';
import { usePopupLog } from '../contexts/PopUpLogContext';

const useShowError = () => {
    const { setShowLoading } = useLoading();
    const { handleShowError } = usePopupLog();

    const showError = (error: any) => {
        setShowLoading(false);
        if(error.response?.data?.detail){
            handleShowError(error.response.data.detail);
        }
        handleShowError(`Algo deu errado ${ error.response ? `- ${error.response.status}` : '' }`);
        console.error('Error:', error.message);
    }

    const showUnespectedResponse = (response: any) => {
        handleShowError(`Resposta inesperada - ${response.status}`)
        console.error('Unexpected response status:', response.status);
    }

    return {
        showError,
        showUnespectedResponse
    }
};

export default useShowError;