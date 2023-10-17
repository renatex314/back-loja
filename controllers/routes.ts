import { Router } from "express";
import clienteController from "./cliente.controller";
import marcaController from "./marca.controller";
import metpagController from "./metpag.controller";
import produtoController from "./produto.controller";
import vendaController from "./venda.controller";
import authController from "./auth.controller";

const router = Router();

/*****************************/
/***    AUTENTICAÇÃO       ***/
/*****************************/
router.get("/me", authController.getClientMeData);

/*****************************/
/***      CLIENTES         ***/
/*****************************/
router.get("/cliente/list", clienteController.getClientes);
router.post("/cliente/create", clienteController.createCliente);
router.put("/cliente/update", clienteController.updateCliente);
router.delete("/cliente/delete/:cliId", clienteController.deleteCliente);

/*****************************/
/***        MARCAS         ***/
/*****************************/
router.get("/marca/dropdown", marcaController.getMarcasDropdown);
router.get("/marca/:marcaId", marcaController.getMarca);
router.post("/marca/create", marcaController.createMarca);
router.delete("/marca/delete/:marcaId", marcaController.deleteMarca);

/*****************************/
/***    MÉTODO PAGAMENTO   ***/
/*****************************/
router.get(
  "/metodopagamento/dropdown",
  metpagController.getMetodoPagamentoDropdown
);
router.post("/metodopagamento/create", metpagController.createMetodoPagamento);
router.delete(
  "/metodopagamento/delete/:metPagId",
  metpagController.deleteMetodoPagamento
);

/*****************************/
/***        PRODUTO        ***/
/*****************************/
router.get("/produto/list", produtoController.getProdutos);
router.post("/produto/create", produtoController.createProduto);
router.put("/produto/update", produtoController.updateProduto);
router.delete("/produto/delete/:prodId", produtoController.deleteProduto);

/*****************************/
/***         VENDA         ***/
/*****************************/
router.get("/venda/list", vendaController.getVendas);
router.get("/venda/list/cliente/:cliId", vendaController.getVendasByCliId);
router.post("/venda/create", vendaController.createVenda);

export default router;
