import { User } from "../classes/User";
import { CertificateAuthority } from "../classes/CertificateAuthority";

export default interface PropsFnScenario {
  alice: User;
  bob: User;
  ca: CertificateAuthority;
}
