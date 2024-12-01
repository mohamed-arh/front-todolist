import {useMutation, useQueryClient} from "@tanstack/react-query";
import {notification} from "antd";
import {useAppContext} from "@/AppContext.js";

export default function useAddItem(mutationFn, queryKey) {
  const queryClient = useQueryClient();
  const { toggleModal } = useAppContext();

  return useMutation({
    mutationFn: mutationFn,

    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKey);
      notification.success({
        message: 'Succès',
        description:  data?.data?.message ? data?.data?.message : queryKey +' Créé avec succès.',
        placement: 'topRight',
        duration: 3,
      });
      toggleModal('createModal');

    },
    onError: (data) => {
      notification.error({
        message: data.response.data.error ? data.response.data.error : 'Erreur',
        description: data.response.data.message ? data.response.data.message : 'Erreur lors de la creation du ' + queryKey,
        placement: 'topRight',
        duration: 3,
      });
      console.error("Erreur lors de la requête DELETE :", data);
    },
  });
}