import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTHORS } from "../graphql/queries";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { useRef, useState, useEffect } from "react";
import { Toast } from "primereact/toast";
import { ADD_AUTHOR } from "../graphql/mutations";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const { loading, error, data } = useQuery(GET_AUTHORS);
    const [nombre, setNombre] = useState("");
    const [correo, SetCorreo] = useState("");
    const [apellido, setApellido] = useState("");
    const toast = useRef<Toast>(null);
    const [displayDialog, setDisplayDialog] = useState(false);

    useEffect(() => {
        if (data && data.obtenerAutores) {
            setAuthors(data.obtenerAutores);
        }
    }, [data]);

    const [addUser] = useMutation(ADD_AUTHOR, {
        refetchQueries: [{ query: GET_AUTHORS }],
    });

    const handleSubmit = async () => {
        try {
            await addUser({ variables: { nombre, apellido, correo } });
            toast.current?.show({ severity: "success", summary: "Success", detail: "Autor registrado" });
            setNombre("");
            setApellido("");
            SetCorreo("");
            setDisplayDialog(false);
        } catch (error) {
            toast.current?.show({ severity: "error", summary: "Error", detail: "Error al guardar el autor" });
        }
    };

    if (loading) return <ProgressSpinner />;
    if (error) return <h1>Error:{error.message}</h1>;

    const openNew = () => {
        setDisplayDialog(true);
    };

    const hideDialog = () => {
        setDisplayDialog(false);
    };

    const dialogFooter = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={handleSubmit} />
        </div>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div style={{ textAlign: "center", padding: "20px" }}>
                <img
                    src="https://www.primefaces.org/primereact-v5/showcase/images/primereact-logo-dark.png"
                    alt="PrimeReact Logo"
                    width="450"
                />
            </div>
            <Button label="Nuevo" icon="pi pi-plus" onClick={openNew} />
            <DataTable value={authors} paginator rows={5}>
                <Column field="id" header="Id" />
                <Column field="nombre" header="Nombre" sortable />
                <Column field="apellido" header="Apellido" />
                <Column field="correo" header="Correo" />
            </DataTable>

            <Dialog visible={displayDialog} header="Nuevo Autor" footer={dialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <div className="p-field">
                        <label htmlFor="name">Nombre: </label>
                        <InputText id="name" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="apellido">Apellido: </label>
                        <InputText id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="email">Email: </label>
                        <InputText id="email" value={correo} onChange={(e) => SetCorreo(e.target.value)} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
