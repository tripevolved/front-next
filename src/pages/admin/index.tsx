import { AdminPage } from "@/components";
import { CMSService } from "@/services/cms/cms-service";
import { Button } from "mars-ds";

export default function AdminHomePage() {
  const handleClick = async () => {
    const data = await CMSService.getUidPages();
    console.log(data);
  };

  return (
    <AdminPage>
      <p>Olá, seja bem vindo</p>

      <Button onClick={handleClick}>Carregar dados</Button>
    </AdminPage>
  );
}
