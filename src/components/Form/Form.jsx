import { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Divider,
  Button,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Center,
} from "@chakra-ui/react";

export default function Form({ title, fields, buttons }) {
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
    <Card width={"container.sm"}>
      <CardHeader>
        <Text fontSize="4xl" textAlign="center">
          {title}
        </Text>
      </CardHeader>
      <Divider />
      <CardBody>
        {fields.map((field, index) => (
          <FormControl key={index} mb={4}>
            <FormLabel>{field.label}</FormLabel>
            <Input
              type={field.type}
              placeholder={field.label}
              defaultValue={formValues[field.label]}
              onChange={(e) => handleInputChange(field.field, e.target.value)}
            />
          </FormControl>
        ))}
      </CardBody>
      <CardFooter>
        <Stack
          width={"100%"}
          spacing={3}
          direction={"row"}
          justifyContent={"space-around"}
        >
          {buttons.map((field, index) => (
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
      </CardFooter>
    </Card>
  );
}
