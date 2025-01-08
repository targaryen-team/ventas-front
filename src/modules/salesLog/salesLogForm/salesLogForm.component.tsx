import { useRef, useState } from 'react';
import useHeadquarters from "../../../hooks/useHeadquarters.hook";
import usePaymentMethods from "../../../hooks/usePaymentMethods.hook";

import ProgressBarComponent from '../../../components/progressBar/progressBar.component';
import useUploadFile from '../../../hooks/useUploadFile.hook';
import { ISalesLog } from '../../../interfaces/salesLog';
import useSalesLogs from '../../../hooks/useSalesLogs.hook';


const SalesLogFormComponent = (props: { close: () => void }) => {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);

  const [salesLog, setSalesLog] = useState<ISalesLog>({
    id: 0,
    description: '',
    price: 0,
    quantity: 0,
    finalPrice: 0,
    date: new Date(),
    registrant: '',
    method: null as any,
    file: '',
    headquarter: ''
  })

  const { addOne, salesLogs } = useSalesLogs();
  const { headquarters } = useHeadquarters()
  const { paymentMethods } = usePaymentMethods()

  const { handleUpload, progressBar } = useUploadFile({ file })
  const fileInputRef = useRef<any>(null);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const url = await handleUpload();

    addOne({
      ...salesLog,
      id: salesLogs[salesLogs.length - 1]?.id ? (salesLogs[salesLogs.length - 1].id + 1) : 1,
      file: url
    })
    setLoading(false)
    props.close()
  }

  const handleChange = (e: any) => {
    setSalesLog({
      ...salesLog,
      [e.target.name]: e?.target?.value
    })
  }

  return (

    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">

        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
          <input onChange={handleChange} value={salesLog?.description} type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Descripcion" required />
        </div>
        <div>
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
          <input onChange={handleChange} value={Number(salesLog?.price)} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Precio" required />
        </div>
        <div>
          <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad</label>
          <input onChange={handleChange} value={Number(salesLog?.quantity)} type="number" name="quantity" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cantidad" required />
        </div>
        <div>
          <label htmlFor="finalPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio Final</label>
          <input onChange={handleChange} value={Number(salesLog?.finalPrice)} type="number" name="finalPrice" id="finalPrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Precio Final" required />
        </div>
        <div>
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Registro</label>
          <input onChange={handleChange}  type="date" id="date" name="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
      </div>

      {/* Registrante */}
      <div className="mb-6">
        <label htmlFor="registrant" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Registrante</label>
        <select onChange={handleChange} id="registrant" name="registrant" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Registrante</option>
          <option value="Laura">Laura</option>
          <option value="Sofia">Sofia</option>
          <option value="Vivian">Vivian</option>
        </select>
      </div>

      {/* Metodo de Pago */}
      <div className="mb-6">
        <label htmlFor="method" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Metodo de Pago</label>
        <select onChange={handleChange} id="method" name="method" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Elige una opcion</option>
          {paymentMethods?.map(_e => <option value={_e?.id}>{_e?.name}</option>)}
        </select>
      </div>

      {/* Sede */}
      <div className="mb-6">
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sede</label>
        <select onChange={handleChange} id="headquarter" name="headquarter" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Elige una opcion</option>
          {headquarters?.map(_e => <option value={_e?.id}>{_e?.name}</option>)}
        </select>
      </div>
      <div className="mb-6">

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Comprobante</label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          onChange={_e => setFile(_e?.target?.files?.[0])}
          ref={fileInputRef}
        />

      </div>

      {progressBar > 0 && <ProgressBarComponent progress={progressBar} />}

      <div className="flex justify-end gap-2 items-center py-4 pb-4 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button disabled={loading} onClick={props.close} data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>
        <button disabled={loading} data-modal-hide="default-modal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar</button>
      </div>
    </form>

  )
}

export default SalesLogFormComponent