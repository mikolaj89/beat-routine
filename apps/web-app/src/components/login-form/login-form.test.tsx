import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginForm } from "./login-form";

const mutateMock = vi.fn();
const useLoginMock = vi.fn();

vi.mock("@/hooks/use-login", () => ({
  useLogin: () => useLoginMock(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    mutateMock.mockReset();
    useLoginMock.mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      error: null,
    });
  });

  it("shows validation errors for invalid input", async () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: "Sign in" });
    await userEvent.click(submitButton);

    expect(await screen.findByText("Email cannot be empty")).toBeInTheDocument();
    expect(
      await screen.findByText("Password cannot be empty")
    ).toBeInTheDocument();
    expect(mutateMock).not.toHaveBeenCalled();
  });

  it("submits valid credentials", async () => {
    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText(/Email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/Password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(mutateMock).toHaveBeenCalledTimes(1);
    expect(mutateMock).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });
});
