import React from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import type { itemType } from "../pages/gudang";

interface props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: itemType) => void;
}

const AddItem: React.FC<props> = ({ isOpen, onClose, onSubmit }) => {
  const { handleSubmit, errors, register, formState } = useForm();
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Tambah Barang</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="name" isRequired>
                <FormLabel>Nama Barang</FormLabel>
                <Input
                  type="text"
                  name="name"
                  placeholder="Nama Barang"
                  ref={register({ required: true })}
                />
              </FormControl>
              <FormControl mt="4" id="price" isRequired>
                <FormLabel>Harga Satuan</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="Rp" />
                  <Input
                    type="number"
                    name="price"
                    placeholder="0"
                    ref={register({ required: true })}
                  />
                </InputGroup>
                <FormControl mt="4" id="quantity" isRequired>
                  <FormLabel>Jumlah Barang</FormLabel>
                  <Input
                    type="number"
                    name="quantity"
                    placeholder="0"
                    ref={register({ required: true })}
                  />
                </FormControl>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="twitter" mr={3}>
                Simpan
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Batal
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddItem;
