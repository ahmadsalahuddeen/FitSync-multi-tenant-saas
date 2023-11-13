import axios from "@/lib/axios";
import React from "react";
import { useMutation } from "react-query";
import { toast } from "sonner";

type Props = {
  url: string;
  method: "post" | "get";
  onSuccess?: (responeData: any) => void;
}; 
export default ({ url, method, onSuccess }: Props) => {
  const [errors, setErrors] = React.useState(null);
  const {
    mutate: doRequest,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (body: any) => {
      try {
        const response = await axios[method](url, body);

        if (onSuccess) {
          onSuccess(response.data);
        }
      } catch (err: any ) {
        err.response.data.errors.map((err: any) => {
          toast.error(err.message);
        });
      }
    },
  });

  return { doRequest, isLoading, isError };
};
``