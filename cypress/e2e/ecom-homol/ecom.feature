@EcomJourney @UI @REGRESSION
Feature: [WEB] Ecom Journey

	Background: Common steps
		And verify elements
	# And accept cookies

	@SANITY
	Scenario Outline: Manual Simulation
		When click to start the journey
		And type "11988887777" user
		And click in continue
		And click in continue ok
		And click in manual filling
		And type "Rodrigo Oliveira Salles" name
		And type "35999999999" whatsapp
		And type "rodrigo.oliveira@scoder.com.br" email
		And click in "Avançar" next
		And type "100.000,00" bill value
		And type "Santa Rita do Sapucaí - MG" city
		And type "CEMIG-D | CEMIG DISTRIBUIÇÃO S.A" energy company
		And click in "Avançar" next
		# Then check manual simulation
		And click in "Anexar fatura" next
		And "<invoice>" upload file
		And type "81715716/0004-10" cnpj
		And click in "Avançar" next
		And click in "Contratar agora!" next
		And check "Concordar" continue button "disable"
		And scroll to bottom
		And check "Concordar" continue button "enable"
		And click in "Concordar" next
		And click in "Avançar" next
		And check if exist representative to delete
		And click in "Adicionar novo representante" next
		And click in representative
		And type "12622755635" cpf representative
		And type "05/06/1999" birthday representative
		And type "rodrigo.oliveira@scoder.com.br" email representative
		And type "35992027336" phone representative
		And "cnh_test.png" upload file
		And click in save button
		And click in "Avançar" next
		# And "UNIMED.pdf" upload file
		And click in "Avançar" next
		And click to open accordion company
		And click in "Confirmar" next
		And click to open accordion adress
		And click in "Confirmar" next
		And click in "Avançar" next
		And click in "Continuar" next
		And check waiting to sign
		Then check success toast

		Examples:
			| invoice               |
			| UNIMED.pdf            |
			| ENEL_Junho_24_CMD.pdf |
			| MSA_EMPRESA.pdf       |

	@SANITY
	Scenario Outline: Upload file Simulation
		When click to start the journey
		And type "11988887777" user
		And click in continue
		And click in continue ok
		And "<invoice>" upload file
		And type "Rodrigo Oliveira Salles" name
		And type "35999999999" whatsapp
		And type "rodrigo.oliveira@scoder.com.br" email
		And click in "Avançar" next
		And type "81715716/0004-10" cnpj
		# And type "Company Name Test" companyName
		# And type "Fantasy Name Test" fantasyName
		And click in "Avançar" next
		And click in "Contratar agora!" next
		And check "Concordar" continue button "disable"
		And scroll to bottom
		And check "Concordar" continue button "enable"
		And click in "Concordar" next
		And click in "Avançar" next
		And check if exist representative to delete
		And click in "Adicionar novo representante" next
		And click in representative
		And type "12622755635" cpf representative
		And type "05/06/1999" birthday representative
		And type "rodrigo.oliveira@scoder.com.br" email representative
		And type "35992027336" phone representative
		And "cnh_test.png" upload file
		And click in save button
		And click in "Avançar" next
		# And "UNIMED.pdf" upload file
		And click in "Avançar" next
		And click to open accordion company
		And click in "Confirmar" next
		And click to open accordion adress
		And click in "Confirmar" next
		And click in "Avançar" next
		And click in "Continuar" next
		And check waiting to sign
		Then check success toast

		Examples:
			| invoice               |
			| UNIMED.pdf            |
			| ENEL_Junho_24_CMD.pdf |
			| MSA_EMPRESA.pdf       |

	@SANITY
	Scenario Outline: Manual Simulation - Special Cases
		When click to start the journey
		And type "11988887777" user
		And click in continue
		And click in continue ok
		And click in manual filling
		And type "Rodrigo Oliveira Salles" name
		And type "35999999999" whatsapp
		And type "rodrigo.oliveira@scoder.com.br" email
		And click in "Avançar" next
		And type "100.000,00" bill value
		And type "Santa Rita do Sapucaí - MG" city
		And type "CEMIG-D | CEMIG DISTRIBUIÇÃO S.A" energy company
		And click in "Avançar" next
		# Then check manual simulation
		And click in "Anexar fatura" next
		And "<invoice>" upload file
		And click in "Agendar Agora" next

		Examples:
			| invoice           |
			| Enel_A4_Verde.pdf |

	@SANITY
	Scenario Outline: Upload file Simulation - Special Cases
		When click to start the journey
		And type "11988887777" user
		And click in continue
		And click in continue ok
		And "<invoice>" upload file
		And type "Rodrigo Oliveira Salles" name
		And type "35999999999" whatsapp
		And type "rodrigo.oliveira@scoder.com.br" email
		And click in "Avançar" next
		And click in "Agendar Agora" next

		Examples:
			| invoice           |
			| Enel_A4_Verde.pdf |