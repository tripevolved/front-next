import { AdminPage } from "@/components";
import { ApiService } from "@/services/api/api-service";
import { Button } from "mars-ds";

export default function AdminHomePage() {
  const handleClick = async () => {
    const data = await ApiService.getUidPages();
    console.log(data);
  };

  return (
    <AdminPage>
      <p>Olá, seja bem vindo</p>

      <Button onClick={handleClick}>Carregar dados</Button>
    </AdminPage>
  );
}
