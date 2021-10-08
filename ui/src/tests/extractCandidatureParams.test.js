import extractCandidatureParams from "../../services/extractCandidatureParams";

describe('extractCandidatureParams', () => {

    it('By default it fills mandatory fields', () => {
      expect(extractCandidatureParams()).toEqual({ 
        applicant_email: "alan.leruyet@free.fr",
        applicant_first_name: null,
        applicant_last_name: null,
        applicant_phone: null,
        company_email: "alan.leruyet@free.fr",
        company_name: null,
        company_siret: null,
        message: null,
        company_address: null,
        company_naf: null,
      });
    });

    it('Maps values correctly', () => {
      const applicant_h = {
        email: "jane@doe.com",
        firstName: "Jane",
        lastName: "Doe",
        message: "sth important",
        phone: "0607080910",
        terms: true,
      }
      const company_h = {
        email: "company@example.com",
        name: "CLEOP",
        phone: "",
        siret: "75223710700020",
        size: "3 à 5 salariés",
        socialNetwork: ""
      }
      const res = extractCandidatureParams(applicant_h, company_h)
      expect(res).toEqual({
        company_email: 'company@example.com',
        applicant_email: 'jane@doe.com',
        applicant_first_name: 'Jane',
        applicant_last_name: 'Doe',
        applicant_phone: '0607080910',
        message: 'sth important',
        company_siret: '75223710700020',
        company_name: 'CLEOP',
        company_address: null,
        company_naf: null,
      });
    });

});
