import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function FormModal({ isOpen, onClose, title, fields, buttons }) {
  const [formValues, setFormValues] = useState(
    fields.reduce((acc, field) => {
      acc[field.field] = field.value || "";
      return acc;
    }, {})
  );

  const handleInputChange = (label, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [label]: value,
    }));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {fields?.map((field, index) => (
              <FormControl key={index} mb={4}>
                <FormLabel>{field.label}</FormLabel>
                <Input
                  type={field.type}
                  placeholder={field.label}
                  defaultValue={formValues[field.label]}
                  onChange={(e) =>
                    handleInputChange(field.field, e.target.value)
                  }
                />
              </FormControl>
            ))}
          </ModalBody>
          <ModalFooter>
            <Stack
              width={"100%"}
              spacing={3}
              direction={"row"}
              justifyContent={"space-around"}
            >
              {buttons?.map((field, index) => (
                <Button
                  key={index}
                  colorScheme={field.color}
                  variant={field.variant}
                  onClick={() => field.onClick(formValues)}
                >
                  {field.label}
                </Button>
              ))}
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
