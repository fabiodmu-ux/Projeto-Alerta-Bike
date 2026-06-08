# Contribuindo para o Projeto-Alerta-Bike

Obrigado por considerar contribuir para o **Alerta Bike**! Este documento fornece diretrizes e instruções para contribuir com o projeto.

## Como Contribuir

### 1. Reportar Bugs

Se você encontrar um bug, abra uma [issue](https://github.com/fabiodmu-ux/Projeto-Alerta-Bike/issues) com as seguintes informações:

- **Título descritivo**: Uma linha clara descrevendo o problema
- **Descrição detalhada**: Explique o comportamento esperado versus o comportamento atual
- **Passos para reproduzir**: Liste os passos específicos para reproduzir o bug
- **Exemplos**: Forneça exemplos específicos de reproduzir o caso
- **Ambiente**: Sistema operacional, versão do Node.js, navegador, etc.

### 2. Sugerir Melhorias

Sugestões de novas funcionalidades são bem-vindas! Para sugerir uma melhoria:

- Use um **título claro e descritivo** para a sugestão
- Forneça uma **descrição detalhada** da funcionalidade proposta
- Liste alguns **exemplos** de como a funcionalidade funcionaria
- Explique **por que essa melhoria seria útil** para os usuários

### 3. Submeter Pull Requests

Seguir estas diretrizes ajudará a garantir que seu PR seja aceito rapidamente:

#### Preparação

1. **Fork o repositório** e crie uma branch a partir de `main`
   ```bash
   git checkout -b feature/sua-feature-descritiva
   ```

2. **Faça suas mudanças** seguindo os padrões do projeto
   - Mantenha o código limpo e bem documentado
   - Adicione comentários quando necessário
   - Siga os padrões de código existentes

3. **Adicione testes** (se aplicável)
   - Escreva testes para novas funcionalidades
   - Certifique-se de que todos os testes passam

4. **Atualize a documentação**
   - Atualize README.md se necessário
   - Atualize API.md para mudanças de API
   - Atualize ARCHITECTURE.md para mudanças estruturais

5. **Commit suas mudanças**
   ```bash
   git commit -m "Tipo: descrição clara das mudanças"
   ```
   - Use mensagens de commit claras e descritivas
   - Tipos sugeridos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

6. **Push para sua branch**
   ```bash
   git push origin feature/sua-feature-descritiva
   ```

7. **Abra um Pull Request**
   - Descreva claramente o que foi mudado e por quê
   - Referencia qualquer issue relacionada (ex: "Closes #123")
   - Inclua screenshots/gifs se houver mudanças visuais

## Padrões do Projeto

### Estrutura de Código

- Mantenha o código modular e reutilizável
- Siga as convenções de nomenclatura existentes
- Use nomes significativos para variáveis e funções
- Adicione comentários para lógica complexa

### Documentação

- Todas as funções públicas devem ter comentários explicativos
- Mantenha o README.md atualizado
- Adicione exemplos de uso quando aplicável
- Documente dependências externas

### Commits

Seguir o padrão Conventional Commits:

```
<tipo>(<escopo>): <subject>

<body>

<footer>
```

**Tipos:**
- `feat`: Uma nova funcionalidade
- `fix`: Uma correção de bug
- `docs`: Mudanças na documentação
- `style`: Mudanças que não afetam o significado do código
- `refactor`: Refatoração de código sem mudanças de funcionalidade
- `test`: Adicionar ou atualizar testes
- `chore`: Mudanças em build, dependências, etc.

## Processo de Review

1. Um mantenedor será atribuído ao seu PR
2. O código será revisado para qualidade e conformidade
3. Você pode receber solicitações de mudanças
4. Após aprovação, seu PR será mesclado

## Código de Conduta

Por favor, note que este projeto está vinculado a um [Código de Conduta](./CODE_OF_CONDUCT.md). Ao participar, você concorda em manter uma comunidade respeitosa e inclusiva.

## Dúvidas?

Se tiver dúvidas sobre como contribuir, abra uma [discussion](https://github.com/fabiodmu-ux/Projeto-Alerta-Bike/discussions) ou envie um email para fabiodmu@gmail.com.

## Licença

Ao contribuir para este projeto, você concorda que suas contribuições serão licenciadas sob a [Licença MIT](./LICENSE).

---

Obrigado por contribuir para o Alerta Bike! 🚴
